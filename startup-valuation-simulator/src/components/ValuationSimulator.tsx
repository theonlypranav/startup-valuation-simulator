import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ValuationSimulator() {
  const [arpu, setArpu] = useState(100);
  const [cac, setCac] = useState(50);
  const [churn, setChurn] = useState(5);
  const [growth, setGrowth] = useState(10);
  const [customers, setCustomers] = useState(1000);

  const months = 24;
  const discountRate = 0.12 / 12;

  const simulate = () => {
    let data = [];
    let totalValuation = 0;
    let active = customers;

    for (let i = 1; i <= months; i++) {
      active *= 1 + (growth - churn) / 100;
      let revenue = active * arpu;
      let discounted = revenue / Math.pow(1 + discountRate, i);
      totalValuation += discounted;
      data.push({
        month: `M${i}`,
        revenue: parseFloat(revenue.toFixed(2)),
        discounted: parseFloat(discounted.toFixed(2)),
      });
    }

    return { data, valuation: totalValuation.toFixed(2) };
  };

  const { data, valuation } = simulate();

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>📈 Startup Valuation Simulator</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>ARPU (₹)</Label>
            <Input type="number" value={arpu} onChange={(e) => setArpu(+e.target.value)} />
          </div>
          <div>
            <Label>CAC (₹)</Label>
            <Input type="number" value={cac} onChange={(e) => setCac(+e.target.value)} />
          </div>
          <div>
            <Label>Churn Rate (%)</Label>
            <Input type="number" value={churn} onChange={(e) => setChurn(+e.target.value)} />
          </div>
          <div>
            <Label>Growth Rate (%)</Label>
            <Input type="number" value={growth} onChange={(e) => setGrowth(+e.target.value)} />
          </div>
          <div>
            <Label>Initial Users</Label>
            <Input type="number" value={customers} onChange={(e) => setCustomers(+e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>💡 Valuation (Discounted Over 24 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">
            ₹ {valuation}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📊 Monthly Revenue Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} />
              <Line type="monotone" dataKey="discounted" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
