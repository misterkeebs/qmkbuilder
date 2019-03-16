module.exports = `$Comp
L Device:R <%= data.name %>
U 1 1 <%= data.tstamp %>
P <%= data.x %> <%= data.y %>
F 0 "R3" V <%= data.x %> <%= data.y - 50 %> 50  0000 C CNN
F 1 "22" V <%= data.x %> <%= data.y + 50 %> 50  0000 C CNN
F 2 "Resistor_SMD:R_0805_2012Metric_Pad1.15x1.40mm_HandSolder" V <%= data.x - 70 %> <%= data.y %> 50  0001 C CNN
F 3 "~" H <%= data.x %> <%= data.y %> 50  0001 C CNN
	1    <%= data.x %> <%= data.y %>
	0    1    1    0
$EndComp
`;
