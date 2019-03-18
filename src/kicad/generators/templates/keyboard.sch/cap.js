module.exports = `$Comp
L Device:C_Small <%= data.name %>
U 1 1 <%= data.tstamp %>
P <%= data.x %> <%= data.y %>
F 0 "<%= data.name %>" V <%= data.x + 50 %> <%= data.y + 100 %> 50  0000 C CNN
F 1 "1u" V <%= data.x + 50 %> <%= data.y - 100 %> 50  0000 C CNN
F 2 "Capacitor_SMD:C_0805_2012Metric_Pad1.15x1.40mm_HandSolder" H <%= data.x %> <%= data.y %> 50  0001 C CNN
F 3 "~" H <%= data.x %> <%= data.y %> 50  0001 C CNN
	1    <%= data.x %> <%= data.y %>
	0    1    1    0
$EndComp
`;
