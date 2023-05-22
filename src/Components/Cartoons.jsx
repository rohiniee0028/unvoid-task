import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Cartoons.css";
import LoadingSpinner from './LoadingSpinner';

const Cartoons = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setIsLoading(true);
        try {
            let res = await axios.get('https://api.sampleapis.com/cartoons/cartoons2D')
            let data = await res.data;
            console.log(data);
            setData(data);
            setIsLoading(false)
        }
        catch (err) {
            console.log(err);
            setErrorMessage("Unable to fetch user list...");
            setIsLoading(false);

        }

    }

    const renderCartoons = () => {

    }

    if(isLoading){
        return <LoadingSpinner />
    }
    else if(errorMessage){
      return <div className="error"><h2>{errorMessage}</h2></div>
    }
    else{
        return (
            <div>
                <div className='heading'>
                    <h1>Cartoons</h1>
                </div>
                <div className='container'>
                    {
                        data?.map((el) => (
                            <div className='cards' key={el.id}>
                                <img src={el.id === 22 || el.id === 14 || el.id === 6 ? "https://images.indianexpress.com/2019/07/doraemon.jpg" : el.image} alt={`cartoons-images-${el.id}`} width={"85%"} height={'70%'} />
                                <h3>{el.title}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
  
};

export default Cartoons;