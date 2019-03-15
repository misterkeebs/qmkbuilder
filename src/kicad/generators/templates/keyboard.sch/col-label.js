module.exports = `
Text GLabel <%= data.x + 300 %> <%= data.y - 350 %> 0    50   Input ~ 0
col<%= data.col %>
Wire Wire Line
	<%= data.x + 300 %> <%= data.y - 350 %> <%= data.x + 300 %> <%= data.y %>
`;
