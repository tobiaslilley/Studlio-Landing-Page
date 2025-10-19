const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://htizxlmrzfehvpupvwbn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aXp4bG1yemZlaHZwdXB2d2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMTY3NDEsImV4cCI6MjA3MTY5Mjc0MX0.pBC8d5zXG6DZeU3atMZEqOgY4WG8Mh7T0m2tVk5CcUY'

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = async (req, res) => {
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

    // Escape HTML characters for security
    const escapeHtml = (text) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    }

    // Generate HTML with proper meta tags
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(protocolName)} - STUDL.IO</title>
    <meta name="description" content="${escapeHtml(shortDescription)}">
    
    <!-- OpenGraph Meta Tags -->
    <meta property="og:title" content="${escapeHtml(protocolName)} - STUDL.IO">
    <meta property="og:description" content="${escapeHtml(shortDescription)}">
    <meta property="og:image" content="https://studl.io/Assets/opengraph.png">
    <meta property="og:url" content="https://studl.io/api/protocol/${id}/meta">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="STUDL.IO">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(protocolName)} - STUDL.IO">
    <meta name="twitter:description" content="${escapeHtml(shortDescription)}">
    <meta name="twitter:image" content="https://studl.io/Assets/opengraph.png">
    
    <!-- Redirect to actual protocol page -->
    <meta http-equiv="refresh" content="0; url=https://studl.io/protocol-detail.html?id=${id}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="https://studl.io/Assets/Website-Favicon-Color.svg">
</head>
<body>
    <p>Redirecting to protocol details...</p>
    <script>
        window.location.href = 'https://studl.io/protocol-detail.html?id=${id}';
    </script>
</body>
</html>`

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)

  } catch (error) {
    console.error('Error fetching protocol meta:', error)
    res.status(500).send('Internal server error')
  }
}
