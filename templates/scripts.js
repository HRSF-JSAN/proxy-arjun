module.exports = (items) => 
`
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

  ${items.map((item) => {
    return `<script src="${item}.js"></script>`;
  }).join('\n')}

  <script>
    const resID = Math.floor(Math.random()*1000000 + 1);
    ${items.map((item) => {
    return `
    ReactDOM.hydrate(
      React.createElement(${item}, { restaurantId: resID }),
      document.getElementById('${item}')
    );
    `;
  }).join('\n')}
  </script>
`;
