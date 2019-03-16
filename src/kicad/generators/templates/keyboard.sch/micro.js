module.exports = `$Comp
L keyboard_parts:ATMEGA32U4 <%= data.name %>
U 1 1 <%= data.tstamp %>
P <%= data.x %> <%= data.y %>
F 0 "<%= data.name %>" H <%= data.x + 25 %> <%= data.y + 1337 %> 60  0000 C CNN
F 1 "ATMEGA32U4" H <%= data.x + 25 %> <%= data.y + 1231 %> 60  0000 C CNN
F 2 "Package_QFP:TQFP-44_10x10mm_P0.8mm" H <%= data.x %> <%= data.y %> 60  0001 C CNN
F 3 "" H <%= data.x %> <%= data.y %> 60  0000 C CNN
	1    <%= data.x %> <%= data.y %>
	1    0    0    -1
$EndComp
`;
