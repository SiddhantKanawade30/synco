"use client";

export function Navbar() {
    return (
        <div className="flex justify-between items-center px-4 z-20 py-2 max-w-7xl mx-auto border rounded-full bg-white m-2 fixed top-0 left-0 right-0">
        <div className="gap-6 flex">
            <h1>Logo</h1>
            <div className="flex gap-3">
                <div>optionA</div>
                <div>optionB</div>
                <div>optionc</div>
            </div>
        </div>
        <div className="flex gap-2">
            <button>Sign In</button>
            <button>Sign Up</button>
        </div>
        </div>
    );
}