'use client';

import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div>
      <AppHeader title="Settings" subtitle="Manage your workspace and preferences." />
      <div className="p-6 space-y-6 max-w-3xl">
        <Card>
          <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Ashish Suvarna" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="ashish@northstar.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Owner" disabled />
            </div>
            <Button size="sm">Save changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Workspace</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workspace">Workspace name</Label>
              <Input id="workspace" defaultValue="Northstar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Company size</Label>
              <Input id="size" defaultValue="45 employees" disabled />
            </div>
            <Button size="sm">Save workspace</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">AI recommendations</p>
                <p className="text-xs text-muted-foreground">Get notified when AIKYA finds new issues</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Org health alerts</p>
                <p className="text-xs text-muted-foreground">Alert me when org health drops below 70</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Weekly digest</p>
                <p className="text-xs text-muted-foreground">Summary of organizational changes every Monday</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Billing</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Current plan</p>
                <p className="text-xs text-muted-foreground">Growth — ₹6,999/month</p>
              </div>
              <Button size="sm" variant="outline">Upgrade</Button>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">All prices in Indian Rupees (INR).</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
