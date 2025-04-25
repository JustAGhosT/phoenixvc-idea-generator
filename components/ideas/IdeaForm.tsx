"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Idea } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  keyDifferentiator: z.string().optional(),
  confidence: z.coerce.number().min(0).max(100),
  rating: z.coerce.number().min(0).max(10),
  
  // Perspectives
  "perspectives.positive": z.array(z.string()).optional(),
  "perspectives.negative": z.array(z.string()).optional(),
  
  // Jobs to be done
  "jtbd.core": z.string().optional(),
  "jtbd.functional": z.string().optional(),
  "jtbd.emotional": z.string().optional(),
  "jtbd.social": z.string().optional(),
  
  // PESTEL
  "pestel.political": z.string().optional(),
  "pestel.economic": z.string().optional(),
  "pestel.social": z.string().optional(),
  "pestel.technological": z.string().optional(),
  "pestel.environmental": z.string().optional(),
  "pestel.legal": z.string().optional(),
  
  // Scenarios
  scenarios: z.array(z.string()).optional(),
  
  // SWOT
  "swot.strengths": z.array(z.string()).optional(),
  "swot.weaknesses": z.array(z.string()).optional(),
  "swot.opportunities": z.array(z.string()).optional(),
  "swot.threats": z.array(z.string()).optional(),
  
  // Porter's Five Forces
  "portersFiveForces.newEntrants": z.string().optional(),
  "portersFiveForces.supplierPower": z.string().optional(),
  "portersFiveForces.buyerPower": z.string().optional(),
  "portersFiveForces.substitutes": z.string().optional(),
  "portersFiveForces.rivalry": z.string().optional(),
  
  // Lean Canvas
  "leanCanvas.problem": z.string().optional(),
  "leanCanvas.customerSegments": z.string().optional(),
  "leanCanvas.uniqueValueProposition": z.string().optional(),
  "leanCanvas.solution": z.string().optional(),
  "leanCanvas.keyMetrics": z.string().optional(),
  "leanCanvas.channels": z.string().optional(),
  "leanCanvas.costStructure": z.string().optional(),
  "leanCanvas.revenueStreams": z.string().optional(),
  "leanCanvas.unfairAdvantage": z.string().optional(),
  
  // Blue Ocean
  "blueOcean.newMarketSpace": z.string().optional(),
  "blueOcean.makeCompetitionIrrelevant": z.string().optional(),
  
  // Market Size
  "marketSize.tam": z.string().optional(),
  "marketSize.sam": z.string().optional(),
  "marketSize.som": z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface IdeaFormProps {
  idea?: Idea;
  onSubmit: (data: Partial<Idea>) => Promise<void>;
  isSubmitting?: boolean;
}

export function IdeaForm({ idea, onSubmit, isSubmitting = false }: IdeaFormProps) {
  // Helper to flatten the nested idea structure for the form
  const flattenIdea = (idea: Idea): FormValues => {
    return {
      title: idea.title,
      keyDifferentiator: idea.keyDifferentiator,
      confidence: idea.confidence,
      rating: idea.rating,
      
      // Perspectives
      "perspectives.positive": idea.perspectives?.positive || [],
      "perspectives.negative": idea.perspectives?.negative || [],
      
      // Jobs to be done
      "jtbd.core": idea.jtbd?.core || "",
      "jtbd.functional": idea.jtbd?.functional || "",
      "jtbd.emotional": idea.jtbd?.emotional || "",
      "jtbd.social": idea.jtbd?.social || "",
      
      // PESTEL
      "pestel.political": idea.pestel?.political || "",
      "pestel.economic": idea.pestel?.economic || "",
      "pestel.social": idea.pestel?.social || "",
      "pestel.technological": idea.pestel?.technological || "",
      "pestel.environmental": idea.pestel?.environmental || "",
      "pestel.legal": idea.pestel?.legal || "",
      
      // Scenarios
      scenarios: idea.scenarios || [],
      
      // SWOT
      "swot.strengths": idea.swot?.strengths || [],
      "swot.weaknesses": idea.swot?.weaknesses || [],
      "swot.opportunities": idea.swot?.opportunities || [],
      "swot.threats": idea.swot?.threats || [],
      
      // Porter's Five Forces
      "portersFiveForces.newEntrants": idea.portersFiveForces?.newEntrants || "",
      "portersFiveForces.supplierPower": idea.portersFiveForces?.supplierPower || "",
      "portersFiveForces.buyerPower": idea.portersFiveForces?.buyerPower || "",
      "portersFiveForces.substitutes": idea.portersFiveForces?.substitutes || "",
      "portersFiveForces.rivalry": idea.portersFiveForces?.rivalry || "",
      
      // Lean Canvas
      "leanCanvas.problem": idea.leanCanvas?.problem || "",
      "leanCanvas.customerSegments": idea.leanCanvas?.customerSegments || "",
      "leanCanvas.uniqueValueProposition": idea.leanCanvas?.uniqueValueProposition || "",
      "leanCanvas.solution": idea.leanCanvas?.solution || "",
      "leanCanvas.keyMetrics": idea.leanCanvas?.keyMetrics || "",
      "leanCanvas.channels": idea.leanCanvas?.channels || "",
      "leanCanvas.costStructure": idea.leanCanvas?.costStructure || "",
      "leanCanvas.revenueStreams": idea.leanCanvas?.revenueStreams || "",
      "leanCanvas.unfairAdvantage": idea.leanCanvas?.unfairAdvantage || "",
      
      // Blue Ocean
      "blueOcean.newMarketSpace": idea.blueOcean?.newMarketSpace || "",
      "blueOcean.makeCompetitionIrrelevant": idea.blueOcean?.makeCompetitionIrrelevant || "",
      
      // Market Size
      "marketSize.tam": idea.marketSize?.tam || "",
      "marketSize.sam": idea.marketSize?.sam || "",
      "marketSize.som": idea.marketSize?.som || "",
    };
  };
  
  // Helper to unflatten form values back to the nested idea structure
  const unflattenFormValues = (values: FormValues): Partial<Idea> => {
    return {
      title: values.title,
      keyDifferentiator: values.keyDifferentiator,
      confidence: values.confidence,
      rating: values.rating,
      
      perspectives: {
        positive: values["perspectives.positive"] || [],
        negative: values["perspectives.negative"] || [],
      },
      
      jtbd: {
        core: values["jtbd.core"] || "",
        functional: values["jtbd.functional"] || "",
        emotional: values["jtbd.emotional"] || "",
        social: values["jtbd.social"] || "",
      },
      
      pestel: {
        political: values["pestel.political"] || "",
        economic: values["pestel.economic"] || "",
        social: values["pestel.social"] || "",
        technological: values["pestel.technological"] || "",
        environmental: values["pestel.environmental"] || "",
        legal: values["pestel.legal"] || "",
      },
      
      scenarios: values.scenarios || [],
      
      swot: {
        strengths: values["swot.strengths"] || [],
        weaknesses: values["swot.weaknesses"] || [],
        opportunities: values["swot.opportunities"] || [],
        threats: values["swot.threats"] || [],
      },
      
      portersFiveForces: {
        newEntrants: values["portersFiveForces.newEntrants"] || "",
        supplierPower: values["portersFiveForces.supplierPower"] || "",
        buyerPower: values["portersFiveForces.buyerPower"] || "",
        substitutes: values["portersFiveForces.substitutes"] || "",
        rivalry: values["portersFiveForces.rivalry"] || "",
      },
      
      leanCanvas: {
        problem: values["leanCanvas.problem"] || "",
        customerSegments: values["leanCanvas.customerSegments"] || "",
        uniqueValueProposition: values["leanCanvas.uniqueValueProposition"] || "",
        solution: values["leanCanvas.solution"] || "",
        keyMetrics: values["leanCanvas.keyMetrics"] || "",
        channels: values["leanCanvas.channels"] || "",
        costStructure: values["leanCanvas.costStructure"] || "",
        revenueStreams: values["leanCanvas.revenueStreams"] || "",
        unfairAdvantage: values["leanCanvas.unfairAdvantage"] || "",
      },
      
      blueOcean: {
        newMarketSpace: values["blueOcean.newMarketSpace"] || "",
        makeCompetitionIrrelevant: values["blueOcean.makeCompetitionIrrelevant"] || "",
      },
      
      marketSize: {
        tam: values["marketSize.tam"] || "",
        sam: values["marketSize.sam"] || "",
        som: values["marketSize.som"] || "",
      },
    };
  };
  
  // Initialize form with flattened idea data or defaults
  const defaultValues = idea ? flattenIdea(idea) : {
    title: "",
    keyDifferentiator: "",
    confidence: 50,
    rating: 5,
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  // Helper to handle array fields (like perspectives.positive)
  const handleArrayField = (field: string, value: string) => {
    const fieldName = field as keyof FormValues;
    const currentValues = form.getValues(fieldName) as string[] || [];
    
    if (value.trim() === "") return;
    
    if (Array.isArray(currentValues)) {
      form.setValue(fieldName, [...currentValues, value.trim()], { shouldValidate: true });
    } else {
      form.setValue(fieldName, [value.trim()], { shouldValidate: true });
    }
  };
  
  // Helper to remove item from array field
  const removeArrayItem = (field: string, index: number) => {
    const fieldName = field as keyof FormValues;
    const currentValues = form.getValues(fieldName) as string[] || [];
    
    if (Array.isArray(currentValues)) {
      const newValues = [...currentValues];
      newValues.splice(index, 1);
      form.setValue(fieldName, newValues, { shouldValidate: true });
    }
  };
  
  const handleSubmit = async (values: FormValues) => {
    try {
      const ideaData = unflattenFormValues(values);
      await onSubmit(ideaData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  // Render array field input with add button
  const renderArrayField = (label: string, fieldName: string) => {
    const values = form.watch(fieldName as any) as string[] || [];
    const [newItem, setNewItem] = useState("");
    
    return (
      <div className="space-y-2">
        <FormLabel>{label}</FormLabel>
        <div className="flex gap-2">
          <Input 
            value={newItem} 
            onChange={(e) => setNewItem(e.target.value)} 
            placeholder={`Add new ${label.toLowerCase()}`}
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              handleArrayField(fieldName, newItem);
              setNewItem("");
            }}
          >
            Add
          </Button>
        </div>
        {values.length > 0 && (
          <ul className="mt-2 space-y-1">
            {values.map((item, index) => (
              <li key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                <span>{item}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeArrayItem(fieldName, index)}
                >
                  ✕
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter idea title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="keyDifferentiator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Differentiator</FormLabel>
                <FormControl>
                  <Input placeholder="What makes this idea unique?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="confidence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confidence (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    max="100" 
                    step="1" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (0-10)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    max="10" 
                    step="0.1" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="perspectives">
            <AccordionTrigger>Perspectives</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderArrayField("Positive Perspectives", "perspectives.positive")}
                {renderArrayField("Negative Perspectives", "perspectives.negative")}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="jtbd">
            <AccordionTrigger>Jobs to be Done</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <FormField
                control={form.control}
                name="jtbd.core"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Core Job</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What is the core job this idea solves?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="jtbd.functional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Functional</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Functional aspects" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="jtbd.emotional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emotional</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Emotional aspects" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="jtbd.social"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Social aspects" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Add more accordion items for other sections */}
          
          <AccordionItem value="pestel">
            <AccordionTrigger>PESTEL Analysis</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pestel.political"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Political</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Political factors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pestel.economic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Economic</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Economic factors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pestel.social"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Social factors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pestel.technological"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technological</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Technological factors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pestel.environmental"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Environmental</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Environmental factors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pestel.legal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Legal</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Legal factors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="swot">
            <AccordionTrigger>SWOT Analysis</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderArrayField("Strengths", "swot.strengths")}
                {renderArrayField("Weaknesses", "swot.weaknesses")}
                {renderArrayField("Opportunities", "swot.opportunities")}
                {renderArrayField("Threats", "swot.threats")}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Add more sections as needed */}
        </Accordion>
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}