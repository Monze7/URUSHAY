'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Search, Lock, ChevronDown, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Component() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-blue-600 p-4 text-white sticky top-0 z-10"
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Urushya</h1>
          </motion.div>
          <nav className="hidden md:block">
            <Button variant="ghost" className="text-white hover:bg-blue-700 mr-2">About</Button>
            <Button variant="ghost" className="text-white hover:bg-blue-700 mr-2">Services</Button>
            <Button variant="ghost" className="text-white hover:bg-blue-700">Contact</Button>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="md:hidden text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>About</DropdownMenuItem>
              <DropdownMenuItem>Services</DropdownMenuItem>
              <DropdownMenuItem>Contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.header>

      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-center text-blue-800"
        >
          Welcome to Urushya
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl mb-12 text-center max-w-2xl text-blue-600"
        >
          Advanced Government PII Detection System
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl"
        >
          {[
            { icon: Shield, title: 'Secure', description: 'State-of-the-art encryption and data protection' },
            { icon: Search, title: 'Accurate', description: 'Advanced algorithms for precise PII detection' },
            { icon: Lock, title: 'Compliant', description: 'Adheres to all government data regulations' }
          ].map((feature, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="bg-white border-blue-200 shadow-lg h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <feature.icon className="h-12 w-12 mb-4 text-blue-500" />
                  <h3 className="text-lg font-semibold mb-2 text-blue-700">{feature.title}</h3>
                  <p className="text-center text-blue-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-lg rounded">
            Signup
          </Link>
          <Link href="/signin" className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 text-lg rounded">
            Signin
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="text-blue-600 mb-2">Discover More</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="h-8 w-8 text-blue-500" />
          </motion.div>
        </motion.div>
      </main>

      <footer className="bg-blue-100 text-blue-600 py-4">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Urushya - Government PII Detection System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}