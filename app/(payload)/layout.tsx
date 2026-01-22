/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

import './custom.scss'
import { importMap } from './admin/importMap.js'

type Args = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Brand and Signage - Admin',
  description: 'Content Management System',
}

const serverFunction = async (args: Parameters<typeof handleServerFunctions>[0]) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  // @ts-expect-error - Payload CMS type mismatch with serverFunction
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
