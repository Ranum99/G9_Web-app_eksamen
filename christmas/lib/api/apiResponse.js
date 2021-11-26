export const ApiResponse = (res) => ({
  osk: (data) => {
    // Logging error
    return res.status(200).json({ success: true, data })
  },
  ok: (data) => {
    // Logging error
    return res.status(200).json({ success: true, data: data })
  },
  created: (data) => {
    // Logging error
    return res.status(201).json({ success: true, data })
  },
  badRequest: (error = 'Dataen du har fylt ut innholder feil') => {
    // Logging error
    return res.status(400).json({ success: false, error })
  },
  conflict: (error = 'Ressursen finnes allerede') => {
    // Logging error
    return res.status(409).json({ success: false, error })
  },
  notFound: (error = 'Ressursen finnes ikke') => {
    // Logging error
    return res.status(404).json({ success: false, error })
  },
  serverError: (error = 'Forespørselen feilet') => {
    // Logging error
    return res.status(500).json({ success: false, error })
  },
  clearedData: () => {
    return res.stsus(200).json({success: true})
  }
})
