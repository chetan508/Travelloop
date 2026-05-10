import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Compass, Search, MapPin, Sparkles, Wallet, Clock, Star, Route,
  Mountain, Utensils, Landmark, Waves, Camera, Plus,
} from 'lucide-react'
import Navbar from '../components/Layout/Navbar'
import AnimatedBackground from '../components/Layout/AnimatedBackground'

type City = {
  name: string
  country: string
  region: string
  cost: 'Low' | 'Medium' | 'Premium'
  popularity: number
  vibe: string
  days: string
  budget: string
}

type Activity = {
  name: string
  city: string
  type: 'Culture' | 'Food' | 'Adventure' | 'Nature' | 'Photo'
  cost: 'Free' | 'Low' | 'Medium' | 'Premium'
  duration: string
  description: string
}

const cities: City[] = [
  { name: 'Kyoto', country: 'Japan', region: 'Asia', cost: 'Medium', popularity: 96, vibe: 'Temples, tea houses, gardens', days: '4-5 days', budget: '$120/day' },
  { name: 'Lisbon', country: 'Portugal', region: 'Europe', cost: 'Medium', popularity: 91, vibe: 'Coastal streets, food, viewpoints', days: '3-4 days', budget: '$95/day' },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', cost: 'Low', popularity: 94, vibe: 'Beaches, wellness, waterfalls', days: '5-7 days', budget: '$70/day' },
  { name: 'Reykjavik', country: 'Iceland', region: 'Europe', cost: 'Premium', popularity: 87, vibe: 'Northern lights, lagoons, road trips', days: '4-6 days', budget: '$190/day' },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', cost: 'Medium', popularity: 89, vibe: 'Mountains, coast, vineyards', days: '5-6 days', budget: '$110/day' },
  { name: 'Marrakesh', country: 'Morocco', region: 'Africa', cost: 'Low', popularity: 84, vibe: 'Markets, riads, desert routes', days: '3-4 days', budget: '$65/day' },
]

const activities: Activity[] = [
  { name: 'Sunrise temple walk', city: 'Kyoto', type: 'Culture', cost: 'Low', duration: '3h', description: 'A calm morning route through shrines, gardens, and old lanes.' },
  { name: 'Pastel de nata food crawl', city: 'Lisbon', type: 'Food', cost: 'Low', duration: '2h', description: 'A self-guided snack route through historic bakeries and viewpoints.' },
  { name: 'Waterfall scooter loop', city: 'Bali', type: 'Adventure', cost: 'Medium', duration: '6h', description: 'A flexible day route connecting waterfalls, rice terraces, and cafes.' },
  { name: 'Northern lights chase', city: 'Reykjavik', type: 'Nature', cost: 'Premium', duration: '5h', description: 'Evening route planning for clear skies and aurora viewpoints.' },
  { name: 'Table Mountain photo trail', city: 'Cape Town', type: 'Photo', cost: 'Medium', duration: '4h', description: 'Scenic overlooks, cable car timing, and golden-hour photo spots.' },
  { name: 'Medina market discovery', city: 'Marrakesh', type: 'Culture', cost: 'Low', duration: '3h', description: 'A compact route through souks, courtyards, crafts, and tea stops.' },
]

const typeIcons = {
  Culture: Landmark,
  Food: Utensils,
  Adventure: Mountain,
  Nature: Waves,
  Photo: Camera,
}

const regions = ['All', ...Array.from(new Set(cities.map(city => city.region)))]
const activityTypes = ['All', ...Array.from(new Set(activities.map(activity => activity.type)))]

export default function ExplorePage(): React.ReactElement {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')
  const [activityType, setActivityType] = useState('All')

  const visibleCities = useMemo(() => {
    const q = query.trim().toLowerCase()
    return cities.filter(city => {
      const matchesRegion = region === 'All' || city.region === region
      const matchesQuery = !q || `${city.name} ${city.country} ${city.vibe}`.toLowerCase().includes(q)
      return matchesRegion && matchesQuery
    })
  }, [query, region])

  const visibleActivities = useMemo(() => {
    const q = query.trim().toLowerCase()
    return activities.filter(activity => {
      const matchesType = activityType === 'All' || activity.type === activityType
      const matchesQuery = !q || `${activity.name} ${activity.city} ${activity.description}`.toLowerCase().includes(q)
      return matchesType && matchesQuery
    })
  }, [query, activityType])

  const planTrip = () => navigate('/dashboard?create=1')

  return (
    <div className="min-h-screen traveloop-app-shell">
      <AnimatedBackground />
      <Navbar />

      <main className="traveloop-explore-page" style={{ paddingTop: 'var(--nav-h)', position: 'relative', zIndex: 1 }}>
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 py-8 sm:py-10">
          <section className="traveloop-card traveloop-page-enter" style={{ borderRadius: 28, padding: '28px clamp(18px, 4vw, 38px)', marginBottom: 22 }}>
            <div className="flex flex-col lg:flex-row lg:items-end gap-5">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--accent)', background: 'var(--accent-soft)' }}>
                  <Compass size={14} /> Explore
                </div>
                <h1 className="mt-4 mb-2 text-[28px] sm:text-[38px] font-black tracking-[-0.04em]" style={{ color: 'var(--text-primary)' }}>
                  Discover cities and activities for your next route
                </h1>
                <p className="max-w-2xl text-sm sm:text-base leading-7" style={{ color: 'var(--text-muted)' }}>
                  Search destination ideas, compare budget signals, and collect inspiration before creating a multi-city itinerary.
                </p>
              </div>
              <button
                onClick={planTrip}
                className="traveloop-premium-button traveloop-flight-button inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold"
              >
                <Plus size={16} /> Plan New Trip
              </button>
            </div>
          </section>

          <section className="traveloop-card" style={{ borderRadius: 22, padding: 14, marginBottom: 22 }}>
            <div className="flex flex-col md:flex-row gap-3">
              <label className="flex-1 flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: 'rgba(8,17,27,0.52)', border: '1px solid var(--border-faint)', color: 'var(--text-primary)' }}>
                <Search size={18} style={{ color: 'var(--text-muted)' }} />
                <input
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder="Search cities, countries, activities..."
                  className="w-full bg-transparent outline-none text-sm"
                  style={{ color: 'var(--text-primary)' }}
                />
              </label>
              <FilterGroup label="Region" options={regions} value={region} onChange={setRegion} />
              <FilterGroup label="Activity" options={activityTypes} value={activityType} onChange={setActivityType} />
            </div>
          </section>

          <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-5">
            <section>
              <SectionTitle icon={MapPin} title="City Search" subtitle="Filter by region, popularity, and estimated daily budget" />
              <div className="grid sm:grid-cols-2 gap-4 traveloop-stagger">
                {visibleCities.map(city => (
                  <article key={city.name} className="traveloop-card traveloop-interactive-card" style={{ borderRadius: 22, padding: 18 }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>{city.name}</h3>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{city.country} · {city.region}</p>
                      </div>
                      <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: costColor(city.cost), color: '#fff' }}>{city.cost}</span>
                    </div>
                    <p className="mt-4 text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>{city.vibe}</p>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <Metric icon={Clock} label="Ideal" value={city.days} />
                      <Metric icon={Wallet} label="Budget" value={city.budget} />
                      <Metric icon={Star} label="Score" value={`${city.popularity}`} />
                    </div>
                    <button onClick={planTrip} className="mt-4 w-full rounded-xl py-2.5 text-sm font-bold transition-colors" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                      Add to trip plan
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle icon={Sparkles} title="Activity Search" subtitle="Browse experiences by type, cost, and duration" />
              <div className="flex flex-col gap-3 traveloop-stagger">
                {visibleActivities.map(activity => {
                  const Icon = typeIcons[activity.type]
                  return (
                    <article key={activity.name} className="traveloop-card traveloop-interactive-card" style={{ borderRadius: 20, padding: 16 }}>
                      <div className="flex gap-3">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-extrabold" style={{ color: 'var(--text-primary)' }}>{activity.name}</h3>
                              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{activity.city} · {activity.type}</p>
                            </div>
                            <span className="text-xs font-bold whitespace-nowrap" style={{ color: 'var(--accent)' }}>{activity.duration}</span>
                          </div>
                          <p className="mt-3 text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>{activity.description}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: costColor(activity.cost), color: '#fff' }}>{activity.cost}</span>
                            <button onClick={planTrip} className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--accent)' }}>
                              <Route size={14} /> Add route idea
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl px-2 py-2 overflow-x-auto" style={{ background: 'rgba(8,17,27,0.40)', border: '1px solid var(--border-faint)' }}>
      <span className="px-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--text-faint)' }}>{label}</span>
      {options.map(option => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className="rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-colors"
          style={{
            color: value === option ? 'var(--accent-text)' : 'var(--text-muted)',
            background: value === option ? 'var(--accent)' : 'transparent',
          }}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
        <Icon size={18} />
      </div>
      <div>
        <h2 className="font-extrabold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
        <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
      </div>
    </div>
  )
}

function Metric({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl p-3" style={{ background: 'rgba(8,17,27,0.34)', border: '1px solid var(--border-faint)' }}>
      <Icon size={14} style={{ color: 'var(--text-muted)' }} />
      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--text-faint)' }}>{label}</p>
      <p className="mt-1 text-xs font-extrabold" style={{ color: 'var(--text-primary)' }}>{value}</p>
    </div>
  )
}

function costColor(cost: string): string {
  if (cost === 'Low' || cost === 'Free') return '#2563eb'
  if (cost === 'Medium') return '#2563eb'
  return '#b91c1c'
}
