module.exports = `  (gr_text "<%= data.text %>" (at <%= data.x %> <%= data.y %>) (layer F.SilkS)
    (effects (font (size <%= data.size_x %> <%= data.size_y %>) (thickness 0.3)) (justify right))
  )
`;
