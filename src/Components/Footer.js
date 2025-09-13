import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-8 mt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                {/* Left: Branding and Description */}
                <div className="text-center md:text-left max-w-md">
                    <h2 className="text-lg font-bold mb-2">HiddenGems</h2>
                    <p className="text-gray-300">
                        Discover offbeat spots and unique local experiences around you. From cozy cafés to
                        creative events, explore the hidden side of your city.
                    </p>
                </div>

                {/* Right: Navigation Links */}
                <div className="flex flex-col items-center md:items-end gap-2">
                   
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} HiddenGems. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
