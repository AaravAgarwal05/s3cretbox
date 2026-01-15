"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";

import { Label } from "../components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { TopRightControls } from "../components/top-right-controls";
import { useRouter } from "next/navigation";
import {
  Plus,
  FolderOpen,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
  Menu,
  Server,
  Key,
  Globe,
  Zap,
  Edit,
  Shield,
  Cloud,
  Lock,
  BookOpen,
  Play,
  Github,
  AlertTriangle,
  Monitor,
  User,
  Upload,
  Download,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { SidebarContent, BucketDialog } from "./components";

// Mock data structure for S3 buckets
interface S3Bucket {
  id: string;
  name: string;
  region: string;
  accessKey: string;
  secretKey: string;
  dateAdded: string;
}

// AWS Regions data
const awsRegions = [
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "us-east-2", label: "US East (Ohio)" },
  { value: "us-west-1", label: "US West (N. California)" },
  { value: "us-west-2", label: "US West (Oregon)" },
  { value: "eu-west-1", label: "Europe (Ireland)" },
  { value: "eu-west-2", label: "Europe (London)" },
  { value: "eu-west-3", label: "Europe (Paris)" },
  { value: "eu-central-1", label: "Europe (Frankfurt)" },
  { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
  { value: "ap-southeast-2", label: "Asia Pacific (Sydney)" },
  { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
  { value: "ap-south-1", label: "Asia Pacific (Mumbai)" },
];

export default function Homepage() {
  const router = useRouter();

  const [selectedBucket, setSelectedBucket] = useState<S3Bucket | null>(null);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingBucket, setEditingBucket] = useState<S3Bucket | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // S3 buckets data - stored in localStorage
  const [buckets, setBuckets] = useState<S3Bucket[]>([]);

  // Load buckets from localStorage on component mount
  useEffect(() => {
    const savedBuckets = localStorage.getItem("s3cretbox-buckets");
    if (savedBuckets) {
      try {
        const parsedBuckets = JSON.parse(savedBuckets);
        setBuckets(parsedBuckets);
        // Auto-select first bucket if available
        if (parsedBuckets.length > 0) {
          setSelectedBucket(parsedBuckets[0]);
        }
      } catch (error) {
        console.error("Error parsing saved buckets:", error);
        localStorage.removeItem("s3cretbox-buckets");
      }
    }
  }, []);

  const [newBucket, setNewBucket] = useState({
    name: "",
    region: "",
    accessKey: "",
    secretKey: "",
  });

  const maskSecretKey = (key: string) => {
    if (!key || key.length < 16) {
      // If key is too short, show first 2 and last 2 characters with dots
      if (key.length <= 4) return key;
      return (
        key.substring(0, 2) +
        "•".repeat(Math.max(0, key.length - 4)) +
        key.substring(key.length - 2)
      );
    }
    return (
      key.substring(0, 8) +
      "•".repeat(Math.max(0, key.length - 16)) +
      key.substring(key.length - 8)
    );
  };

  const maskAccessKey = (key: string) => {
    if (!key || key.length < 10) {
      // If key is too short, show first 2 and last 2 characters with dots
      if (key.length <= 4) return key;
      return (
        key.substring(0, 2) +
        "•".repeat(Math.max(0, key.length - 4)) +
        key.substring(key.length - 2)
      );
    }
    return (
      key.substring(0, 6) +
      "•".repeat(Math.max(0, key.length - 10)) +
      key.substring(key.length - 4)
    );
  };

  const handleAddBucket = () => {
    // Trim whitespaces and validate fields
    const trimmedBucket = {
      name: newBucket.name.trim(),
      region: newBucket.region.trim(),
      accessKey: newBucket.accessKey.trim(),
      secretKey: newBucket.secretKey.trim(),
    };

    if (
      trimmedBucket.name &&
      trimmedBucket.region &&
      trimmedBucket.accessKey &&
      trimmedBucket.secretKey
    ) {
      const bucket: S3Bucket = {
        id: Date.now().toString(),
        ...trimmedBucket,
        dateAdded: new Date().toISOString().split("T")[0],
      };

      // Store in localStorage and update state
      const updatedBuckets = [...buckets, bucket];
      setBuckets(updatedBuckets);
      localStorage.setItem("s3cretbox-buckets", JSON.stringify(updatedBuckets));

      // Reset form and close dialog
      setNewBucket({ name: "", region: "", accessKey: "", secretKey: "" });
      setIsAddDialogOpen(false);
      setSelectedBucket(bucket);
    }
  };

  const handleEditBucket = (bucket: S3Bucket) => {
    setEditingBucket({ ...bucket });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingBucket) {
      const updatedBuckets = buckets.map((bucket) =>
        bucket.id === editingBucket.id ? editingBucket : bucket
      );
      setBuckets(updatedBuckets);
      localStorage.setItem("s3cretbox-buckets", JSON.stringify(updatedBuckets));

      // Update selected bucket if it's the one being edited
      if (selectedBucket?.id === editingBucket.id) {
        setSelectedBucket(editingBucket);
      }

      setEditingBucket(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingBucket(null);
    setIsEditDialogOpen(false);
  };

  const handleRemoveBucket = (bucketId: string) => {
    const updatedBuckets = buckets.filter((b) => b.id !== bucketId);
    setBuckets(updatedBuckets);

    // Update localStorage
    if (updatedBuckets.length > 0) {
      localStorage.setItem("s3cretbox-buckets", JSON.stringify(updatedBuckets));
    } else {
      localStorage.removeItem("s3cretbox-buckets");
    }

    // Update selected bucket
    if (selectedBucket?.id === bucketId) {
      setSelectedBucket(updatedBuckets.length > 0 ? updatedBuckets[0] : null);
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <BucketDialog
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        newBucket={newBucket}
        setNewBucket={setNewBucket}
        onAddBucket={handleAddBucket}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        editingBucket={editingBucket}
        setEditingBucket={setEditingBucket}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        awsRegions={awsRegions}
      />
      {/* Fixed Top Right Controls */}
      <TopRightControls />

      <div className="flex h-screen">
        {/* Mobile Menu - Always Visible */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 left-4 z-40 bg-white dark:bg-zinc-900"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <SidebarContent
              isAddDialogOpen={isAddDialogOpen}
              setIsAddDialogOpen={setIsAddDialogOpen}
              newBucket={newBucket}
              setNewBucket={setNewBucket}
              onAddBucket={handleAddBucket}
              isEditDialogOpen={isEditDialogOpen}
              setIsEditDialogOpen={setIsEditDialogOpen}
              editingBucket={editingBucket}
              setEditingBucket={setEditingBucket}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              buckets={buckets}
              selectedBucket={selectedBucket}
              onSelectBucket={setSelectedBucket}
              awsRegions={awsRegions}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {selectedBucket ? (
              <div className="max-w-4xl mx-auto">
                <div className="mb-6 sm:mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 truncate">
                    {selectedBucket.name}
                  </h1>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                    Manage your encrypted S3 bucket configuration
                  </p>
                </div>

                <div className="grid gap-4 sm:gap-6">
                  {/* Bucket Info Card */}
                  <Card className="border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <CardTitle className="flex items-center text-base sm:text-lg">
                            <Server className="w-5 h-5 mr-2 shrink-0" />
                            Bucket Information
                          </CardTitle>
                          <CardDescription className="text-sm">
                            View and manage your S3 bucket details
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleEditBucket(selectedBucket)}
                          className="flex items-center w-full sm:w-auto"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="min-w-0">
                          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Bucket Name
                          </Label>
                          <p className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {selectedBucket.name}
                          </p>
                        </div>
                        <div className="min-w-0">
                          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Region
                          </Label>
                          <p className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center">
                            <Globe className="w-4 h-4 mr-2 shrink-0" />
                            <span className="truncate">
                              {
                                awsRegions.find(
                                  (r) => r.value === selectedBucket.region
                                )?.label
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Credentials Card */}
                  <Card className="border-2 border-orange-200 dark:border-orange-800 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-800 dark:text-orange-200 text-base sm:text-lg">
                        <Key className="w-5 h-5 mr-2 shrink-0" />
                        Encrypted Credentials
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Your AWS credentials are encrypted locally with your PIN
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="min-w-0">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Access Key ID
                        </Label>
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto">
                          {selectedBucket?.accessKey
                            ? maskAccessKey(selectedBucket.accessKey)
                            : "No access key"}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Secret Access Key
                        </Label>
                        <div className="flex items-center gap-2">
                          <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg font-mono text-xs sm:text-sm flex-1 min-w-0 overflow-x-auto">
                            <span className="whitespace-nowrap">
                              {selectedBucket?.secretKey
                                ? showSecretKey
                                  ? selectedBucket.secretKey
                                  : maskSecretKey(selectedBucket.secretKey)
                                : "No secret key"}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowSecretKey(!showSecretKey)}
                            disabled={!selectedBucket?.secretKey}
                            className="shrink-0"
                          >
                            {showSecretKey ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions Card */}
                  <Card className="border-2 border-zinc-200 dark:border-zinc-700">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Quick Actions
                      </CardTitle>
                      <CardDescription>
                        Manage your bucket and files
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href={`/${encodeURIComponent(selectedBucket.name)}`}
                          className="flex-1"
                        >
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                            <FolderOpen className="w-4 h-4 mr-2" />
                            Manage Files
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          onClick={() => handleRemoveBucket(selectedBucket.id)}
                          className="rounded-xl"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Bucket
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <>
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-zinc-200/20 to-zinc-400/20 dark:from-zinc-800/20 dark:to-zinc-600/20" />
                  <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-40' />

                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
                    <div className="text-center">
                      <div className="flex justify-center items-center mb-8">
                        <div className="relative">
                          <div className="w-16 h-16 bg-linear-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-2xl flex items-center justify-center shadow-lg">
                            <Lock className="w-8 h-8 text-white dark:text-zinc-900" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                            <Cloud className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>

                      <h1 className="text-4xl sm:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                        S3cret
                        <span className="text-zinc-600 dark:text-zinc-400">
                          Box
                        </span>
                      </h1>

                      <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-3xl mx-auto">
                        Your encrypted S3-powered cloud vault
                      </p>

                      <p className="text-lg text-zinc-500 dark:text-zinc-500 mb-10 max-w-2xl mx-auto">
                        Securely manage your AWS S3 files with local encryption,
                        zero backend storage, and complete privacy control.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                          size="lg"
                          onClick={() => setIsAddDialogOpen(true)}
                          className="bg-zinc-900 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <Shield className="w-5 h-5 mr-2" />
                          Get Started Securely
                        </Button>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link href="/aws-guide">
                            <Button
                              variant="outline"
                              size="lg"
                              className="border-2 border-blue-300 dark:border-blue-700 px-8 py-6 text-lg font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-200 w-full"
                            >
                              <BookOpen className="w-5 h-5 mr-2" />
                              AWS Setup Guide
                            </Button>
                          </Link>
                          <Link href="/demo-bucket">
                            <Button
                              variant="outline"
                              size="lg"
                              className="border-2 border-emerald-300 dark:border-emerald-700 px-8 py-6 text-lg font-semibold rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all duration-200 w-full"
                            >
                              <Play className="w-5 h-5 mr-2" />
                              Try Demo
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* AWS Pricing Alert */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                    <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <AlertTitle className="text-orange-800 dark:text-orange-200 font-semibold">
                      AWS Pricing Notice
                    </AlertTitle>
                    <AlertDescription className="text-orange-700 dark:text-orange-300">
                      While S3cretBox is free to use, AWS S3 is a paid service.
                      You may incur AWS charges for storage, downloads, or
                      requests if you exceed the free tier limits.
                    </AlertDescription>
                  </Alert>
                </section>

                {/* Features Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  <div className="text-center mb-16">
                    <Badge
                      variant="secondary"
                      className="mb-6 px-4 py-2 text-sm font-medium"
                    >
                      Features
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                      Built for Security & Simplicity
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                      Everything you need to manage your S3 files securely,
                      without compromising on privacy or ease of use.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <Card className="border-2 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 shadow-sm hover:shadow-md">
                      <CardHeader className="text-center pb-4">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                          🔐 Locally Encrypted AWS Access
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          Your AWS credentials are encrypted with your personal
                          PIN and stored only in your browser. No server-side
                          storage means maximum security.
                        </CardDescription>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 shadow-sm hover:shadow-md">
                      <CardHeader className="text-center pb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <FolderOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                          🗂️ Visual File Explorer for Multiple Buckets
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          Navigate through all your S3 buckets with an
                          intuitive, modern interface. Upload, download, and
                          organize files effortlessly.
                        </CardDescription>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 shadow-sm hover:shadow-md">
                      <CardHeader className="text-center pb-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Monitor className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                          🧠 No Backend — Everything Runs in Your Browser
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          Complete client-side operation means zero data
                          collection, no tracking, and full control over your
                          information and privacy.
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* How It Works Section */}
                <section className="bg-zinc-100/50 dark:bg-zinc-900/50 py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                      <Badge
                        variant="secondary"
                        className="mb-6 px-4 py-2 text-sm font-medium"
                      >
                        How It Works
                      </Badge>
                      <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Get Started in 3 Simple Steps
                      </h2>
                      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Start managing your S3 files securely in minutes with
                        our streamlined setup process.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="relative mb-6">
                          <div className="w-16 h-16 bg-zinc-900 dark:bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                            <User className="w-8 h-8 text-white dark:text-zinc-900" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            1
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                          Go to Homepage
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          Enter the Homepage to get started. No account creation
                          required, just secure local access.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="relative mb-6">
                          <div className="w-16 h-16 bg-zinc-900 dark:bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                            <Key className="w-8 h-8 text-white dark:text-zinc-900" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            2
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                          Enter & Encrypt Your AWS Credentials
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          Input your AWS credentials and create a secret PIN.
                          Everything is encrypted locally in your browser.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="relative mb-6">
                          <div className="w-16 h-16 bg-zinc-900 dark:bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                            <Zap className="w-8 h-8 text-white dark:text-zinc-900" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            3
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                          Manage Your Files Visually
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          Upload, download, delete, and organize your S3 files
                          through an intuitive, modern interface.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center items-center mt-12 space-x-8 text-zinc-400 dark:text-zinc-600">
                      <Upload className="w-6 h-6" />
                      <div className="h-px bg-zinc-300 dark:bg-zinc-700 w-8"></div>
                      <Download className="w-6 h-6" />
                      <div className="h-px bg-zinc-300 dark:bg-zinc-700 w-8"></div>
                      <Trash2 className="w-6 h-6" />
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <footer className="bg-zinc-900 dark:bg-zinc-950 text-zinc-400 py-12">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                      <div className="col-span-2">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-zinc-700 rounded-lg flex items-center justify-center mr-3">
                            <Lock className="w-4 h-4 text-zinc-300" />
                          </div>
                          <span className="text-xl font-bold text-zinc-200">
                            S3cretBox
                          </span>
                        </div>
                        <p className="text-zinc-500 max-w-md leading-relaxed">
                          Your secure, privacy-first S3 file manager. Built with
                          modern web technologies for maximum security and ease
                          of use.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-zinc-200 font-semibold mb-4">
                          Resources
                        </h4>
                        <ul className="space-y-2">
                          <li>
                            <a
                              href="#"
                              className="hover:text-zinc-200 transition-colors duration-200 flex items-center"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              GitHub Repository
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="hover:text-zinc-200 transition-colors duration-200 flex items-center"
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Support Email
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-zinc-200 font-semibold mb-4">
                          Legal
                        </h4>
                        <ul className="space-y-2">
                          <li>
                            <a
                              href="#"
                              className="hover:text-zinc-200 transition-colors duration-200"
                            >
                              Terms of Use
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="hover:text-zinc-200 transition-colors duration-200"
                            >
                              Privacy Policy
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-zinc-800 dark:border-zinc-700 mt-8 pt-8 text-center">
                      <p className="text-zinc-500">
                        © 2025 S3cretBox. Built with ❤️ for secure cloud storage
                        management.
                      </p>
                      <p className="text-zinc-600 text-sm mt-2">
                        This application does not store your data. All
                        operations are performed client-side.
                      </p>
                    </div>
                  </div>
                </footer>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
