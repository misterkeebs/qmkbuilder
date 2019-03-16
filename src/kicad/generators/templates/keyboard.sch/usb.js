module.exports = `$Comp
L keyboard_parts:USB_mini_micro_B <%= data.name %>
U 1 1 <%= data.tstamp %>
P <%= data.x %> <%= data.y %>
F 0 "<%= data.name %>" H <%= data.x - 118 %> <%= data.y + 291 %> 60  0000 C CNN
F 1 "USB_mini_micro_B" H <%= data.x - 150 %> <%= data.y + 200 %> 60  0001 C CNN
F 2 "keyboard_parts:USB_miniB_hirose_5S8" H 6500 <%= data.y %> 60  0001 C CNN
F 3 "" H <%= data.x - 50 %> <%= data.y %> 60  0000 C CNN
	1    <%= data.x %> <%= data.y %>
	1    0    0    -1
$EndComp
`;
