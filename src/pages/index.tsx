import Image from "next/image";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useState } from "react";

export default function Home() {
  const { connected, wallet } = useWallet();
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  async function handleConnect() {
    const walletAddress = await wallet.getChangeAddress();
    const walletBalance = await wallet.getLovelace();
    setAddress(walletAddress);
    setBalance(walletBalance);
  }

  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="bg-black p-6 text-white flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/image1.png"
            alt="logo"
            width={100}
            height={100}
            className="rounded-full mr-6"
          />
          <h1 className="text-3xl font-bold">Cardano Developer Workshop MCU</h1>
        </div>
        <div>
          <CardanoWallet
            label="Hubungkan Wallet"
            isDark={false}
            metamask={{ network: "preprod" }}
            onConnected={handleConnect}
          />
        </div>
      </div>
      {!connected && (
        <p className="text-red-500 text-center font-bold mt-20">
          Dompet tidak terhubung
        </p>
      )}
      {connected && (
        <div className="flex justify-center items-center mt-20">
          <div className="p-6 border border-black rounded-xl font-bold">
            <h1 className="text-center text-3xl mb-3">Wallet-ku</h1>
            <p>Address : {address}</p>
            <p>Balance : {parseInt(balance) / 1000000} ADA</p>
          </div>
        </div>
      )}
    </div>
  );
}
