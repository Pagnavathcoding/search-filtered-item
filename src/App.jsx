import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    useEffect(() => {
        async function items() {
            const res = axios.get(`https://fortnite-api.theapinetwork.com/store/get`);
            return res.then((data) => {
                setData(data.data.data);
            }).catch((err) => {
                return err;
            })
        }
        items();
    }, []);
    const infos = data.filter((data) => {
        return data.item.name.toLowerCase().includes(value.toLowerCase().trim());
    })
    const count = infos.length.toString();
    return (
        <main>
            <header>
                <h1>Search Filtered Item</h1>
                <input type="text" placeholder="Search item by name..." value={value} onChange={e => setValue(e.target.value)} />
                <p style={{ display: infos.length === 0 ? "none" : "flex" }}>{count < 10 ? "0" + count : count}</p>
            </header>
            <section className="container">
                {
                    infos.map((data) => {
                        return (
                            <div key={data.item.name} className="item">
                                <img src={data.item.images.icon} alt={data.item.name} />
                                <h3>{data.item.name}</h3>
                                <p>{data.item.description === "" ? "Not showing!" : data.item.description}</p>
                            </div>
                        )
                    })
                }
            </section>
            <div className="error" style={{
                display: infos.length === 0 ? "flex" : "none"
            }}>
                <h1>Item not found!</h1>
            </div>
        </main>
    )
}
export default App;