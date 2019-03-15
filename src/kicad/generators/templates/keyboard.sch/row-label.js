module.exports = `
Text GLabel <%= data.x - 600 %> <%= data.y + 400 %> 0    50   Input ~ 0
row<%= data.row %>
Wire Wire Line
	<%= data.x - 600 %> <%= data.y + 400 %> <%= data.x - 350 %> <%= data.y + 400 %>
`;
