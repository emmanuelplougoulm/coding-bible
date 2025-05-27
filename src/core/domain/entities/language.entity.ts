import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LanguageDocument = Language & Document;

@Schema({ timestamps: true })
export class Language {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  get id(): string {
    return this._id.toString();
  }

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String })
  icon?: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
