import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWlzbWlndWVscm9kcmlndWV6MzMzQGdtYWlsLmNvbSIsImlhdCI6MTcxMTQwMjUzNywiZXhwIjoxNzExNDg4OTM3fQ.A8V1z7XIEnGAuKWvklhdML5ER1HAIOMjHovBdLsCFpc'
    }
});
