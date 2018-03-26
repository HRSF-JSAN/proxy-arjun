module.exports = (items) => 
`
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

  ${items.map((item) => {
    return `<script src="bundle.js"></script>`;
  }).join('\n')}

  <script>
    ${items.map((item) => {
    return `
    const resID = Math.floor(Math.random()*10000000 + 1);
    ReactDOM.hydrate(
      React.createElement(${item}, { restaurantId: resID }),
      document.getElementById('${item}')
    );
    `;
  }).join('\n')}
  </script>
`;
