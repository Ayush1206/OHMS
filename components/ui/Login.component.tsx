import { motion } from 'framer-motion';
import React from 'react'

const Login= () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      );
}

export default Login