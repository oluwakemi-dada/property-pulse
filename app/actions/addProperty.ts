'use server';

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import cloudinary from '@/config/cloudinary';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

const addProperty = async (formData: FormData) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required');
    }

    const { userId } = sessionUser;

    const images = formData
      .getAll('images')
      .filter(
        (image): image is File => image instanceof File && image.name !== '',
      );

      
    if (images.length === 0) {
      return {
        error: true,
        message: 'At least one image is required'
      }
    }

    const propertyData = {
      owner: userId,
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities: formData.getAll('amenities'),
      rates: {
        nightly: formData.get('rates.nightly'),
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      images: [] as string[],
    };

    const imageUrls = [];

    for (const imageFile of images) {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert to base64
      const imageBase64 = imageData.toString('base64');

      // Make request to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: 'propertypulse',
        },
      );

      imageUrls.push(result.secure_url);
    }

    propertyData.images = imageUrls;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath('/', 'layout');
    redirect(`/properties/${newProperty._id}`);
  } catch (error: any) {
    console.error('Error adding property:', error)
    
    if (isRedirectError(error)) {
      throw error;
    }
    
    return {
      error: true,
      message: error.message || 'Failed to add property. Please try again.'
    }
  }
};


export default addProperty;
