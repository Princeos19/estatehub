import { supabase } from './supabase'

export async function getFavourites(userId) {
  const { data, error } = await supabase
    .from('favourites')
    .select('listing_id')
    .eq('user_id', userId)
  if (error) throw error
  return data.map((f) => f.listing_id)
}

export async function addFavourite(userId, listingId) {
  const { error } = await supabase
    .from('favourites')
    .insert({ user_id: userId, listing_id: listingId })
  if (error) throw error
}

export async function removeFavourite(userId, listingId) {
  const { error } = await supabase
    .from('favourites')
    .delete()
    .eq('user_id', userId)
    .eq('listing_id', listingId)
  if (error) throw error
}

export async function getFavouriteListings(userId) {
  const { data, error } = await supabase
    .from('favourites')
    .select(`
      listing_id,
      listings (*)
    `)
    .eq('user_id', userId)
  if (error) throw error
  return data.map((f) => f.listings)
}

export async function submitEnquiry({ userId, listingId, name, email, phone, message }) {
  const { error } = await supabase
    .from('enquiries')
    .insert({
      user_id: userId || null,
      listing_id: listingId,
      name,
      email,
      phone,
      message,
    })
  if (error) throw error
}
