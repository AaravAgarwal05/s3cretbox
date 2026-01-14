"use client";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  ArrowLeft,
  Shield,
  Database,
  User,
  DollarSign,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function AWSGuide() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">AWS S3 Setup Guide</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            A complete beginner-friendly guide to setting up AWS S3 for use with
            S3cretBox
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a
                href="#what-is-s3"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                1. What is AWS S3?
              </a>
              <a
                href="#pricing"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                2. S3 Pricing in INR
              </a>
              <a
                href="#create-bucket"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                3. Creating an S3 Bucket
              </a>
              <a
                href="#cors-setup"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                4. Setting up CORS
              </a>
              <a
                href="#iam-setup"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                5. Creating IAM User
              </a>
              <a
                href="#policy-setup"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                6. Attaching Policies
              </a>
            </div>
          </CardContent>
        </Card>

        {/* What is AWS S3 */}
        <section id="what-is-s3" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6" />
                What is AWS S3?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Amazon Simple Storage Service (S3)</strong> is a cloud
                storage service that allows you to store and retrieve any amount
                of data from anywhere on the web.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600 dark:text-green-400">
                    ✅ Benefits:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>99.999999999% (11 9&apos;s) durability</li>
                    <li>Virtually unlimited storage</li>
                    <li>Global accessibility</li>
                    <li>Pay only for what you use</li>
                    <li>Built-in security features</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                    🔧 Use Cases:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Website hosting</li>
                    <li>Data backup & archiving</li>
                    <li>Content distribution</li>
                    <li>Big data analytics</li>
                    <li>Application data storage</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                AWS S3 Pricing in INR (2025)
              </CardTitle>
              <CardDescription>
                Approximate costs based on current exchange rates (1 USD ≈ 83
                INR)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader className="pb-2">
                    <Badge variant="secondary" className="w-fit">
                      Free Tier
                    </Badge>
                    <CardTitle className="text-lg">First 12 Months</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• 5 GB Standard storage</p>
                    <p>• 20,000 GET requests</p>
                    <p>• 2,000 PUT requests</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      Cost: ₹0
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Standard Storage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• ₹1.9 per GB/month</p>
                    <p>• ₹0.03 per 1,000 GET requests</p>
                    <p>• ₹0.4 per 1,000 PUT requests</p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Most common usage
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Data Transfer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Upload: Free</p>
                    <p>• Download (first 1 GB/month): Free</p>
                    <p>• Download (after 1 GB): ₹7.5 per GB</p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      For internet transfers
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">💡 Cost Example:</h4>
                <p className="text-sm">
                  Storing 10 GB with 1,000 file operations per month ≈{" "}
                  <strong>₹20-25/month</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Create Bucket */}
        <section id="create-bucket" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6" />
                Creating an S3 Bucket
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    1
                  </Badge>
                  <div>
                    <p className="font-medium">Sign in to AWS Console</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Go to{" "}
                      <a
                        href="https://console.aws.amazon.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        console.aws.amazon.com
                      </a>{" "}
                      and sign in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    2
                  </Badge>
                  <div>
                    <p className="font-medium">Navigate to S3</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Search for &quot;S3&quot; in the services search bar and
                      click on it
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    3
                  </Badge>
                  <div>
                    <p className="font-medium">Create Bucket</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Click &quot;Create bucket&quot; button
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    4
                  </Badge>
                  <div>
                    <p className="font-medium">Configure Bucket Settings</p>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mt-1">
                      <p>
                        • <strong>Bucket name:</strong> Choose a unique name
                        (e.g., &quot;my-s3cretbox-storage-2025&quot;)
                      </p>
                      <p>
                        • <strong>Region:</strong> Choose closest to you (e.g.,
                        &quot;Asia Pacific (Mumbai)&quot; for India)
                      </p>
                      <p>
                        • <strong>Block Public Access:</strong> Keep all boxes
                        checked (recommended for security)
                      </p>
                      <p>
                        • <strong>Versioning:</strong> Enable if you want file
                        version history
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    5
                  </Badge>
                  <div>
                    <p className="font-medium">Create the Bucket</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Click &quot;Create bucket&quot; at the bottom
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CORS Setup */}
        <section id="cors-setup" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Setting up CORS (Cross-Origin Resource Sharing)
              </CardTitle>
              <CardDescription>
                Required for S3cretBox to access your bucket from the browser
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    1
                  </Badge>
                  <div>
                    <p className="font-medium">Open Your Bucket</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Click on your bucket name in the S3 console
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    2
                  </Badge>
                  <div>
                    <p className="font-medium">Go to Permissions Tab</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Click on the &quot;Permissions&quot; tab
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    3
                  </Badge>
                  <div>
                    <p className="font-medium">Edit CORS Configuration</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Scroll down to &quot;Cross-origin resource sharing
                      (CORS)&quot; and click &quot;Edit&quot;
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    4
                  </Badge>
                  <div>
                    <p className="font-medium">Add CORS Policy</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                      Copy and paste this configuration:
                    </p>
                    <div className="bg-zinc-900 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-green-400">
                        {`[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    5
                  </Badge>
                  <div>
                    <p className="font-medium">Save Changes</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Click &quot;Save changes&quot;
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* IAM User Setup */}
        <section id="iam-setup" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                Creating an IAM User
              </CardTitle>
              <CardDescription>
                Create a dedicated user with limited permissions for S3cretBox
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    1
                  </Badge>
                  <div>
                    <p className="font-medium">Navigate to IAM</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      In AWS Console, search for &quot;IAM&quot; and click on it
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    2
                  </Badge>
                  <div>
                    <p className="font-medium">Go to Users</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Click on &quot;Users&quot; in the left sidebar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    3
                  </Badge>
                  <div>
                    <p className="font-medium">Create User</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Click &quot;Create user&quot; button
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    4
                  </Badge>
                  <div>
                    <p className="font-medium">User Details</p>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mt-1">
                      <p>
                        • <strong>User name:</strong> s3cretbox-user (or any
                        name you prefer)
                      </p>
                      <p>
                        • <strong>Access type:</strong> Programmatic access only
                      </p>
                      <p>• Don&apos;t provide AWS Management Console access</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    5
                  </Badge>
                  <div>
                    <p className="font-medium">Skip Permissions for Now</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Click &quot;Next&quot; without attaching any policies
                      (we&apos;ll do this in the next step)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    6
                  </Badge>
                  <div>
                    <p className="font-medium">Create User</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Review and click &quot;Create user&quot;
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    7
                  </Badge>
                  <div>
                    <p className="font-medium">Create Access Keys</p>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mt-1">
                      <p>• Click on the newly created user</p>
                      <p>• Go to &quot;Security credentials&quot; tab</p>
                      <p>• Click &quot;Create access key&quot;</p>
                      <p>
                        • Choose &quot;Third-party service&quot; and click
                        &quot;Next&quot;
                      </p>
                      <p>
                        • Add a description like &quot;S3cretBox access&quot;
                      </p>
                      <p>• Click &quot;Create access key&quot;</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    ⚠️ Important: Save your Access Key ID and Secret Access Key
                    securely. You won&apos;t be able to see the secret again!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Policy Setup */}
        <section id="policy-setup" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Attaching S3 Policy
              </CardTitle>
              <CardDescription>
                Give your IAM user the right permissions to access your S3
                bucket
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    1
                  </Badge>
                  <div>
                    <p className="font-medium">Go to Your User</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      In IAM Users, click on your s3cretbox-user
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    2
                  </Badge>
                  <div>
                    <p className="font-medium">Attach Policies</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Click on &quot;Permissions&quot; tab, then &quot;Add
                      permissions&quot; → &quot;Attach policies directly&quot;
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    3
                  </Badge>
                  <div>
                    <p className="font-medium">Create Custom Policy</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                      Click &quot;Create policy&quot; and use the JSON editor
                      with this policy (replace YOUR-BUCKET-NAME):
                    </p>
                    <div className="bg-zinc-900 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-green-400">
                        {`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME"
    },
    {
      "Effect": "Allow", 
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    4
                  </Badge>
                  <div>
                    <p className="font-medium">Review and Create</p>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mt-1">
                      <p>• Click &quot;Next: Tags&quot; (skip tags)</p>
                      <p>• Click &quot;Next: Review&quot;</p>
                      <p>• Name: S3cretBoxAccess</p>
                      <p>• Description: Policy for S3cretBox bucket access</p>
                      <p>• Click &quot;Create policy&quot;</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    5
                  </Badge>
                  <div>
                    <p className="font-medium">Attach to User</p>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mt-1">
                      <p>• Go back to your user&apos;s permissions</p>
                      <p>
                        • Click &quot;Add permissions&quot; → &quot;Attach
                        policies directly&quot;
                      </p>
                      <p>• Search for &quot;S3cretBoxAccess&quot;</p>
                      <p>• Select it and click &quot;Add permissions&quot;</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  🎉 You&apos;re All Set!
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your AWS S3 bucket is now ready to use with S3cretBox. Use
                  your Access Key ID and Secret Access Key in the app.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to S3cretBox
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
