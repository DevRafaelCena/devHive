<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tags')->insert([
            [
                'nome' => 'Serverless',
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'API',
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Integração',
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Relatório',
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
