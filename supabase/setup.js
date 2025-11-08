// Supabase Schema Setup Script
// Run with: node supabase/setup.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function runSchema() {
  console.log('🚀 Starting Supabase Schema Setup...\n');

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Error: Missing Supabase credentials in .env');
    console.log('Make sure you have:');
    console.log('- NEXT_PUBLIC_SUPABASE_URL');
    console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY\n');
    process.exit(1);
  }

  // Create Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  console.log('📋 Configuration:');
  console.log(`- URL: ${SUPABASE_URL}`);
  console.log(`- Key: ${SUPABASE_ANON_KEY.substring(0, 20)}...\n`);

  // Read schema file
  const schemaPath = path.join(__dirname, 'schema.sql');
  let schema;
  
  try {
    schema = fs.readFileSync(schemaPath, 'utf8');
    console.log('✅ Schema file loaded\n');
  } catch (error) {
    console.error('❌ Error reading schema.sql:', error.message);
    process.exit(1);
  }

  // Split SQL into individual statements
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('SELECT'));

  console.log(`📝 Found ${statements.length} SQL statements to execute\n`);
  console.log('⚠️  Note: This will use the anon key which has limited permissions.');
  console.log('   For full schema setup, please run the SQL in Supabase Dashboard.\n');
  console.log('🔗 Dashboard: https://supabase.com/dashboard/project/wcbounpetrnmbsliqozg/sql\n');

  // Try to verify connection
  console.log('🔍 Verifying connection...');
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError) {
    console.error('❌ Connection error:', sessionError.message);
    process.exit(1);
  }

  console.log('✅ Connection successful!\n');

  // Check if tables already exist
  console.log('🔍 Checking existing tables...\n');
  
  const tables = ['profiles', 'generated_images', 'generation_history'];
  let allTablesExist = true;

  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1);
    
    if (error) {
      if (error.code === '42P01' || error.message.includes('Could not find the table')) {
        console.log(`❌ Table "${table}" does not exist`);
        allTablesExist = false;
      } else {
        console.log(`⚠️  Error checking "${table}":`, error.message);
        allTablesExist = false;
      }
    } else {
      console.log(`✅ Table "${table}" exists`);
    }
  }

  console.log('\n' + '='.repeat(60) + '\n');

  if (allTablesExist) {
    console.log('🎉 All tables already exist!');
    console.log('✅ Database is ready to use.\n');
  } else {
    console.log('⚠️  Some tables are missing.');
    console.log('\n📝 To create the tables, please:');
    console.log('1. Go to: https://supabase.com/dashboard/project/wcbounpetrnmbsliqozg/sql');
    console.log('2. Copy the content from: supabase/schema.sql');
    console.log('3. Paste it in the SQL Editor');
    console.log('4. Click "Run"\n');
    console.log('💡 The anon key cannot create tables directly.');
    console.log('   You need to use the Supabase Dashboard for schema changes.\n');
  }

  console.log('✨ Setup check complete!\n');
}

runSchema().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});

