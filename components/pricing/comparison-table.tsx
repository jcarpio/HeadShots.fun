import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ComparisonTable({ pricingData }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Feature</TableHead>
          {pricingData.map((plan, index) => (
            <TableHead key={index}>{plan.title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Price */}
        <TableRow>
          <TableCell>Price</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>${plan.prices.yearly}/year</TableCell>
          ))}
        </TableRow>

        {/* Credits per Year */}
        <TableRow>
          <TableCell>Credits per Year</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>{plan.benefits[0].replace('Credits: ', '').split(' /')[0]}</TableCell>
          ))}
        </TableRow>

        {/* Credits per Month */}
        <TableRow>
          <TableCell>Credits per Month</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>{plan.benefits[0].replace('Credits: ', '').split(' /')[1]}</TableCell>
          ))}
        </TableRow>

        {/* Shots per Month */}
        <TableRow>
          <TableCell>Shots (1 Credit Each)</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>{plan.benefits[1]}</TableCell>
          ))}
        </TableRow>

        {/* Digital Dream Albums */}
        <TableRow>
          <TableCell>Digital Dream Albums</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>{plan.benefits.find(benefit => benefit.includes("Dream Album Digital")) || <s>Not included</s>}</TableCell>
          ))}
        </TableRow>

        {/* Printed Dream Albums */}
        <TableRow>
          <TableCell>Printed Dream Albums</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>{plan.title === "Business" ? "4/year" : <s>Not included</s>}</TableCell>
          ))}
        </TableRow>

        {/* Custom Model Training */}
        <TableRow>
          <TableCell>Custom Model Training</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>{plan.benefits.find(benefit => benefit.includes("Train custom models")) || <s>Not included</s>}</TableCell>
          ))}
        </TableRow>

        {/* Support */}
        <TableRow>
          <TableCell>Support</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>{plan.benefits.find(benefit => benefit.includes("support"))}</TableCell>
          ))}
        </TableRow>

        {/* Access to Templates */}
        <TableRow>
          <TableCell>Access to Templates</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>{plan.benefits.find(benefit => benefit.includes("templates"))}</TableCell>
          ))}
        </TableRow>

        {/* Users per Account */}
        <TableRow>
          <TableCell>Users per Account</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>{plan.benefits.find(benefit => benefit.includes("user accounts")) || "1"}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}


/* import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ComparisonTable({ pricingData }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Feature</TableHead>
          {pricingData.map((plan, index) => (
            <TableHead key={index}>{plan.quantity} Credits</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Price</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>${plan.price}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Price per Credit</TableCell>
          {pricingData.map((plan, index) => (
            <TableCell key={index}>${(plan.price / plan.quantity).toFixed(2)}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
} */
