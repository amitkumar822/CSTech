import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Globe, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6 text-center">
        <motion.h1
          className="text-4xl font-bold sm:text-5xl mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-yellow-400">CSTech Infosolutions</span>
        </motion.h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-6">
          Delivering innovative IT solutions with excellence and security.
        </p>
        <Link to="/login">
        <Button className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-gray-900 px-6 py-3 text-lg font-semibold">
          Get Started <ArrowRight className="ml-2" />
        </Button>
        </Link>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard title="Software Development" icon={Code} description="Custom web and mobile applications tailored to your needs." />
          <ServiceCard title="Cybersecurity Solutions" icon={ShieldCheck} description="Advanced security measures to protect your digital assets." />
          <ServiceCard title="Cloud Infrastructure" icon={Globe} description="Scalable and efficient cloud computing solutions." />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6 text-center">
        <p className="text-sm">&copy; 2025 CSTech Infosolutions Private Limited. All rights reserved.</p>
      </footer>
    </div>
  );
}

function ServiceCard({ title, icon: Icon, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg border border-gray-200">
        <CardContent className="p-6 text-center">
          <Icon className="text-blue-600 mx-auto mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
