"use client"

import { Breadcrumb } from "@/components/layout/breadcrumb"
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs"
import { usePage } from "@/hooks/use-page"
import { buildBreadcrumbs, createBreadcrumbTrail } from "@/lib/breadcrumb-utils"

export default function BreadcrumbDemoPage() {
  // Set page title and update current breadcrumb
  usePage({ title: "Breadcrumb Demo" })
  
  // Access breadcrumb context for more advanced usage
  const { setBreadcrumbs, breadcrumbs, addBreadcrumb, clearBreadcrumbs } = useBreadcrumbs()
  
  // Example of manually setting breadcrumbs
  const setCustomBreadcrumbs = () => {
    setBreadcrumbs(createBreadcrumbTrail([
      { label: "Custom", href: "/custom" },
      { label: "Path", href: "/custom/path" },
      { label: "Example", href: "/custom/path/example" }
    ]))
  }
  
  // Example of using buildBreadcrumbs with dynamic route params
  const setDynamicBreadcrumbs = () => {
    const path = "/projects/[id]/tasks/[taskId]"
    const params = { id: "project-123", taskId: "task-456" }
    
    setBreadcrumbs(buildBreadcrumbs(path, params))
  }
  
  // Add a single breadcrumb
  const addSingleBreadcrumb = () => {
    addBreadcrumb({
      label: "Added Item",
      href: "/breadcrumbs/demo/added"
    })
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Breadcrumb Demo</h1>
        <p className="text-gray-600 mb-6">
          This page demonstrates the enhanced breadcrumb functionality.
        </p>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Current Breadcrumbs</h2>
        <div className="p-4 border rounded-md">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(breadcrumbs, null, 2)}
          </pre>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Breadcrumb Variants</h2>
        
        <div className="p-4 border rounded-md space-y-4">
          <h3 className="font-medium">Default</h3>
          <Breadcrumb />
          
          <h3 className="font-medium mt-6">Minimal</h3>
          <Breadcrumb variant="minimal" />
          
          <h3 className="font-medium mt-6">Pills</h3>
          <Breadcrumb variant="pills" />
          
          <h3 className="font-medium mt-6">Arrows</h3>
          <Breadcrumb variant="arrows" />
          
          <h3 className="font-medium mt-6">Custom Size (Large)</h3>
          <Breadcrumb size="lg" />
          
          <h3 className="font-medium mt-6">Limited Items (max 2)</h3>
          <Breadcrumb maxItems={2} />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Breadcrumb Actions</h2>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={setCustomBreadcrumbs}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Set Custom Breadcrumbs
          </button>
          
          <button
            onClick={setDynamicBreadcrumbs}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Set Dynamic Route Breadcrumbs
          </button>
          
          <button
            onClick={addSingleBreadcrumb}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add Single Breadcrumb
          </button>
          
          <button
            onClick={clearBreadcrumbs}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reset Breadcrumbs
          </button>
        </div>
      </div>
    </div>
  )
}