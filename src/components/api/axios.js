import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWlzbWlndWVscm9kcmlndWV6MzMzQGdtYWlsLmNvbSIsImlhdCI6MTcxMTA5OTI3OSwiZXhwIjoxNzExMTg1Njc5fQ.gPc5zE_lnqXWlHa6Hg4oGUNIN5y12BbJJmvN3qtVKto'
    }
});
