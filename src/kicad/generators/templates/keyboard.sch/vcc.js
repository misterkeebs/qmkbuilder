module.exports = `$Comp
L power:VCC #<%= data.name %>
U 1 1 <%= data.tstamp %>
P <%= data.x %> <%= data.y %>
F 0 "#PWR0107" H <%= data.x %> <%= data.y - 150 %> 50  0001 C CNN
F 1 "VCC" H <%= data.x + 17 %> <%= data.y + 173 %> 50  0000 C CNN
F 2 "" H <%= data.x %> <%= data.y %> 50  0001 C CNN
F 3 "" H <%= data.x %> <%= data.y %> 50  0001 C CNN
	1    <%= data.x %> <%= data.y %>
	1    0    0    -1
$EndComp
`;
