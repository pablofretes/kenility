import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserDocument extends Document {
  @Prop({ required: true, unique: true, lowercase: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  profilePicture: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
