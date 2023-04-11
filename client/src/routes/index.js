import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp, Error, Forget } from '../pages';
import Protected from './Protected';
import ProtectDashboard from './ProtectDashboard';



import { ethers } from 'ethers';
import abi from '../contract/GalleryContract.json'


const Index = () => {

    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
    });

    useEffect(() => {

        const connectWallet = async () => {

            const contractAddress = "0x8Ac8BC6666f99EDb42fEaad87367C59566551468";
            const contractABI = abi.abi;
            try {
                const { ethereum } = window;
                if (ethereum) {
                    const account = await ethereum.request({ method: "eth_requestAccounts" });
                }

                const provider = await new ethers.providers.Web3Provider(ethereum);
                const signer = await provider.getSigner();
                const contract = await new ethers.Contract(contractAddress, contractABI, signer);

                setState({
                    ...state,
                    provider,
                    signer,
                    contract,
                })


            } catch (error) {
                console.log(error);
            }
        }

        connectWallet()
    }, [])



    return <BrowserRouter >
        <Routes>
            <Route path='/' element={<Protected >
                <SignIn />
            </Protected>} />


            <Route path='/sign_up' element={<Protected>
                <SignUp state={state} />
            </Protected>} />


            <Route path='/dashboard' exact element={
                <ProtectDashboard>
                    <Home state={state} />
                </ProtectDashboard>
            } />


            <Route path='/password_reset' exact element={<Protected >
                <Forget />
            </Protected>} />
            <Route path='*' element={<Error />} />


        </Routes>
    </BrowserRouter>
}

export default Index