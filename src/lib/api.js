import { supabase } from './supabase'

// ── Shape a raw DB row into the format our components expect ──────
function shapeProperty(row) {
  return {
    id: row.id,
    title: row.title,
    price: row.price,
    priceLabel: row.price_label,
    location: row.location,
    address: row.address,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    area: row.area,
    type: row.type,
    status: row.status,
    image: row.image,
    images: row.images || [row.image],
    description: row.description,
    featured: row.featured,
    year: row.year,
    agent: {
      name: row.agent_name,
      phone: row.agent_phone,
      email: row.agent_email,
      avatar: row.agent_avatar,
    },
  }
}

// ── Fetch all listings ────────────────────────────────────────────
export async function getListings() {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data.map(shapeProperty)
}

// ── Fetch featured listings (homepage) ───────────────────────────
export async function getFeaturedListings(limit = 6) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data.map(shapeProperty)
}

// ── Fetch a single listing by ID ──────────────────────────────────
export async function getListingById(id) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return shapeProperty(data)
}

// ── Fetch similar listings (same type, exclude current) ───────────
export async function getSimilarListings(type, excludeId, limit = 3) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('type', type)
    .neq('id', excludeId)
    .limit(limit)

  if (error) throw error

  // Fallback: if no same-type results, grab any 3
  if (data.length === 0) {
    const { data: fallback, error: fbError } = await supabase
      .from('listings')
      .select('*')
      .neq('id', excludeId)
      .limit(limit)

    if (fbError) throw fbError
    return fallback.map(shapeProperty)
  }

  return data.map(shapeProperty)
}

// ── Create a new listing ──────────────────────────────────────────
export async function createListing(data) {
  const { data: row, error } = await supabase
    .from('listings')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return shapeProperty(row)
}

// ── Update an existing listing ────────────────────────────────────
export async function updateListing(id, data) {
  const { data: row, error } = await supabase
    .from('listings')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return shapeProperty(row)
}

// ── Delete a listing ──────────────────────────────────────────────
export async function deleteListing(id) {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id)

  if (error) throw error
}
