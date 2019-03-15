module.exports = `
<% if (data.key.col === 0) { %>
Text GLabel <%= x - 600 %> <%= y + 400 %> 0    50   Input ~ 0
row<%= data.key.row %>
Wire Wire Line
	<%= x - 600 %> <%= y + 400 %> <%= x - 350 %> <%= y + 400 %>
<% } %>
<% if (data.key.col > 0) { %>
Wire Wire Line
	<%= x - 1350 %> <%= y + 400 %> <%= x - 350 %> <%= y + 400 %>
<% } %>
<% if (data.key.row === 0) { %>
Text GLabel <%= x + 300 %> <%= y - 350 %> 0    50   Input ~ 0
col<%= data.key.col %>
Wire Wire Line
	<%= x + 300 %> <%= y - 350 %> <%= x + 300 %> <%= y %>
<% } %>
<% if (data.key.row > 0) { %>
Wire Wire Line
	<%= x + 300 %> <%= y - 1000 %> <%= x + 300 %> <%= y %>
<% } %>
Connection ~ <%= x - 350 %> <%= y + 400 %>
`;
