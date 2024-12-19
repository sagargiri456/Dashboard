'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function ReportIssueForm() {
  const [issueDescription, setIssueDescription] = useState('')
  const [selectedIssues, setSelectedIssues] = useState<string[]>([])

  const issueTypes = [
    "Website Functionality",
    "Asset Upload Problems",
    "Billing & Payments",
    "User Interface Bugs",
    "Others (please specify)"
  ]

  const handleIssueSelection = (issue: string) => {
    setSelectedIssues(prev => 
      prev.includes(issue) 
        ? prev.filter(i => i !== issue)
        : [...prev, issue]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted issues:', selectedIssues)
    console.log('Issue description:', issueDescription)
    // Here you would typically send this data to your backend
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>NEED HELP?</CardTitle>
        <CardDescription className="text-green-600">
          Please describe the issue you're facing, and our support team will get back to you shortly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {issueTypes.map((issue) => (
              <div key={issue} className="flex items-center space-x-2">
                <Checkbox 
                  id={issue} 
                  checked={selectedIssues.includes(issue)}
                  onCheckedChange={() => handleIssueSelection(issue)}
                />
                <label htmlFor={issue} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {issue}
                </label>
              </div>
            ))}
          </div>
          
          <Textarea 
            placeholder="Describe your issue" 
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Submit the Issue
        </Button>
      </CardFooter>
    </Card>
  )
}