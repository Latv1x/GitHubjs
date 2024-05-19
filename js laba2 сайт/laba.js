document.addEventListener('DOMContentLoaded', () => {
    const currencyTableBody = document.querySelector('#currencyTable tbody');

    function fetchCurrencyRates() {
        fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then(response => response.json())
            .then(data => {
                currencyTableBody.innerHTML = ''; // Очищаємо таблицю перед додаванням нових даних
                data.forEach(currency => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${currency.cc}</td>
                        <td>${currency.rate}</td>
                    `;
                    currencyTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching currency data:', error));
    }

    fetchCurrencyRates(); // Отримуємо дані при завантаженні сторінки
    setInterval(fetchCurrencyRates, 60000); // Оновлюємо дані кожні 60 секунд
});
