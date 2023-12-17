import SecretForm from '@/components/secret-form'
import UuidForm from '@/components/uuid-form'
import MD5Form from '@/components/md5-form'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Hash, Lock, TableProperties } from 'lucide-react'

export default function Home() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <Lock className="inline-block mr-2" />
            Password Generator
          </CardTitle>
          <CardDescription>
            Generate a random password or secret.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SecretForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <TableProperties className="inline-block mr-2" />
            UUID Generator
          </CardTitle>
          <CardDescription>Generate a random UUID.</CardDescription>
        </CardHeader>
        <CardContent>
          <UuidForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <Hash className="inline-block mr-2" />
            MD5 Hash Generator
          </CardTitle>
          <CardDescription>Generate a MD5 hash from a string.</CardDescription>
        </CardHeader>
        <CardContent>
          <MD5Form />
        </CardContent>
      </Card>
    </div>
  )
}
