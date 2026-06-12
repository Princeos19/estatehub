export async function sendContactEmail({ name, email, phone, subject, message }) {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'contact', name, email, phone, subject, message }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to send email')
    }
    return response.json()
  }
  
  export async function sendEnquiryEmail({ name, email, phone, message, propertyTitle, agentEmail }) {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'enquiry', name, email, phone, message, propertyTitle, agentEmail }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to send email')
    }
    return response.json()
  }