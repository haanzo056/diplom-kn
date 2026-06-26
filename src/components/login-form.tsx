'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Вхід в адмін-панель</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="flex flex-col gap-4">
            {state?.error && (
              <p className="text-sm text-red-500 text-center">{state.error}</p>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" disabled={pending}>
              {pending ? 'Вхід...' : 'Увійти'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
