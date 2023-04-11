import React, { useState, useEffect } from 'react';

import { ethers } from 'ethers';
import abi from './constract/Coffee.json'

function ContractConfig() {
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
    });

    useEffect(() => {

        const connectWallet = async () => {

            const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
            const contractABI = abi.abi;
            try {
                const { ethereum } = window;
                if (ethereum) {
                    const account = await ethereum.request({ method: "eth_requestAccounts" });
                }

                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

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


    module.exports = state;
}

