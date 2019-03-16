module.exports = `(module keyboard_parts:D_SOD123_axial (layer F.Cu) (tedit 561B6A12)
    (tstamp <%= data.key.id.toString(16) %>1)
    (at
    <%= data.x + 0.5 %>
    <%= data.y + 0.5 %>
    <%= data.rotation %>)
    (attr smd)
    (fp_text reference <%= data.name %> (at 0 1.925 <%= data.rotation %>) (layer F.SilkS)
      (effects (font (size 0.8 0.8) (thickness 0.15)) (justify mirror))
    )
    (fp_text value D (at 0 -1.925 <%= data.rotation %>) (layer F.SilkS) hide
      (effects (font (size 0.8 0.8) (thickness 0.15)) (justify mirror))
    )
    (fp_line (start -2.275 -1.2) (end -2.275 1.2) (layer F.SilkS) (width 0.2))
    (fp_line (start -2.45 -1.2) (end -2.45 1.2) (layer F.SilkS) (width 0.2))
    (fp_line (start -2.625 -1.2) (end -2.625 1.2) (layer F.SilkS) (width 0.2))
    (fp_line (start -3.025 1.2) (end -3.025 -1.2) (layer F.SilkS) (width 0.2))
    (fp_line (start -2.8 -1.2) (end -2.8 1.2) (layer F.SilkS) (width 0.2))
    (fp_line (start -2.925 -1.2) (end -2.925 1.2) (layer F.SilkS) (width 0.2))
    (fp_line (start -3 -1.2) (end 2.8 -1.2) (layer F.SilkS) (width 0.2))
    (fp_line (start 2.8 -1.2) (end 2.8 1.2) (layer F.SilkS) (width 0.2))
    (fp_line (start 2.8 1.2) (end -3 1.2) (layer F.SilkS) (width 0.2))
    (pad 1 smd rect (at -2.7 0 <%= data.rotation %>) (size 2.5 0.5) (layers F.Cu)
      <%- data.netForPad(1) %>)
    (pad 1 smd rect (at -1.575 0 <%= data.rotation %>) (size 1.2 1.2) (layers F.Cu F.Paste F.Mask)
      <%- data.netForPad(1) %>)
    (pad 1 thru_hole rect (at -3.9 0 <%= data.rotation %>) (size 1.6 1.6) (drill 0.7) (layers *.Cu *.Mask F.SilkS)
      <%- data.netForPad(1) %>)
    (pad 2 smd rect (at 1.575 0 <%= data.rotation %>) (size 1.2 1.2) (layers F.Cu F.Paste F.Mask)
      <%- data.netForPad(2) %>)
    (pad 2 smd rect (at 2.7 0 <%= data.rotation %>) (size 2.5 0.5) (layers F.Cu)
      <%- data.netForPad(2) %>)
    (pad 2 thru_hole circle (at 3.9 0 <%= data.rotation %>) (size 1.6 1.6) (drill 0.7) (layers *.Cu *.Mask F.SilkS)
      <%- data.netForPad(2) %>)
  )

`;