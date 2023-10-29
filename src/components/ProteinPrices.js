//WebScraping Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

function ProteinPrices() {
    const [scrapedData, setScrapedData] = useState('');

    useEffect(() => {
        axios.get('https://rysesupps.com/products/loaded-protein?variant=31879078281312&tw_source=google&tw_adid=665883220797&tw_campaign=20370820245&gclid=CjwKCAjwkNOpBhBEEiwAb3MvvQHHZJPnvroEnt2Q87kWGQwaxTT73VS932ZLSo67w07SOJ7u0fX-MRoCQSsQAvD_BwE')
        .then((response) => {
            if (response.status === 200) {
                const $ = cheerio.load(response.data);

                const scrapedData = $('.price-main').text();

                setScrapedData(scrapedData);
            }
        })
        .catch((error) => {
            console.error('Failed to retrieve data:', error);
        });
    }, []);

    return (
        <div>
            <h1>Protein Prices</h1>
            <p>{scrapedData}</p>
        </div>
    );
}

export default ProteinPrices;