import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://htizxlmrzfehvpupvwbn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aXp4bG1yemZlaHZwdXB2d2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMTY3NDEsImV4cCI6MjA3MTY5Mjc0MX0.pBC8d5zXG6DZeU3atMZEqOgY4WG8Mh7T0m2tVk5CcUY'

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(404).json({ error: 'Protocol ID required' })
  }

  try {
    // Fetch protocol data from Supabase
    const { data: protocol, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !protocol) {
      return res.status(404).json({ error: 'Protocol not found' })
    }

    // Set default values
    const protocolName = protocol.name || 'Protocol Details'
    const protocolDescription = protocol.description || 'Learn about this health optimization protocol.'
    
    // Truncate description if too long
    const shortDescription = protocolDescription.length > 150 
      ? protocolDescription.substring(0, 147) + '...'
      : protocolDescription

    // Return protocol data for client-side rendering
    res.status(200).json({
      protocol: {
        id: protocol.id,
        name: protocolName,
        description: shortDescription,
        fullDescription: protocol.description,
        category: protocol.category,
        featured: protocol.featured,
        default_value: protocol.default_value,
        unit: protocol.unit,
        citations: protocol.citations,
        metric_ids: protocol.metric_ids,
        created_at: protocol.created_at
      }
    })

  } catch (error) {
    console.error('Error fetching protocol:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
