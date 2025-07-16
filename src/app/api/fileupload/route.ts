import {auth} from "@/auth";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {redirect} from "next/navigation";
import { GridFSBucket } from "mongodb";
import { MongoClient } from 'mongodb';


export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) {
        redirect('/login');
    }
    let client: MongoClient | null = null; // Initialize client to null for finally block
    try {
        client = new MongoClient(process.env.MONGODB_URI as string);
        await client.connect(); // Connect the client
        const db = client.db();

        const formData = await request.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ message: 'No file uploaded or file is not a valid Blob.' }, { status: 400 });
        }

        const bucket = new GridFSBucket(db);

        const filename = (file as File).name || `untitled-${Date.now()}`;
        const contentType = (file as File).type || 'application/octet-stream';

        const uploadStream = bucket.openUploadStream(filename, {
            metadata: {
                contentType: contentType,
                // uploadedBy: session?.user?.email,
                uploadDate: new Date(),
            },
        });

        const fileId = uploadStream.id;

        const buffer = Buffer.from(await file.arrayBuffer());
        // await new Promise<void>((resolve, reject) => {
        //     uploadStream.end(buffer);
        // });
        uploadStream.end(buffer);
        return NextResponse.json({ message: 'File uploaded successfully!', fileId: fileId, filename: filename }, { status: 201 });
        // return Response.json({ message: 'Hello World' })
        // return new Response('Hello World', { status: 2001 })
    } catch {
        return NextResponse.json({ message: 'Failed to upload file.'}, { status: 500 });
    } finally {
        if (client) {
            await client.close();
        }
    }
}