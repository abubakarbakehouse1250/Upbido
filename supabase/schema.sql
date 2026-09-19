-- UPBIDO production-oriented schema (Supabase/PostgreSQL)
create extension if not exists pgcrypto;

create table if not exists profiles (
 id uuid primary key default gen_random_uuid(), user_id uuid unique,
 display_name text not null, slug text unique not null, tagline text,
 website_url text, logo_url text, country text not null, category text not null,
 verified boolean not null default false, founding_bidder boolean not null default false,
 created_at timestamptz not null default now()
);

create table if not exists bids (
 id uuid primary key default gen_random_uuid(), profile_id uuid not null references profiles(id) on delete cascade,
 amount_usd numeric(12,2) not null check(amount_usd>0),
 status text not null default 'pending' check(status in ('pending','settled','refunded','chargeback','void')),
 provider text, provider_reference text unique, settled_at timestamptz, created_at timestamptz not null default now()
);
create index if not exists bids_rank_idx on bids(status,amount_usd desc,settled_at);

create table if not exists analytics_events (
 id bigint generated always as identity primary key, profile_id uuid references profiles(id) on delete cascade,
 event_type text not null check(event_type in ('impression','profile_view','outbound_click','share')),
 occurred_at timestamptz not null default now()
);

create table if not exists achievements (
 id uuid primary key default gen_random_uuid(), profile_id uuid not null references profiles(id) on delete cascade,
 code text not null, title text not null, battle_window text, awarded_at timestamptz not null default now(),
 unique(profile_id,code,battle_window)
);

create or replace view eligible_bid_totals as
select p.id profile_id,p.display_name,p.slug,p.country,p.category,coalesce(sum(b.amount_usd),0)::numeric(12,2) eligible_usd
from profiles p left join bids b on b.profile_id=p.id and b.status='settled'
group by p.id,p.display_name,p.slug,p.country,p.category;

create or replace view global_leaderboard as
select *,dense_rank() over(order by eligible_usd desc,profile_id) global_rank from eligible_bid_totals;

-- Daily/monthly ranking should be calculated from settled bid events inside each battle window.
-- Never rank pending/refunded/chargeback/void funds.
