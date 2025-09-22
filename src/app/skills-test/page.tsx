'use client';

import React, { useState, useEffect } from 'react';
import { SkillsTest } from '@/components/SkillsTest';
import { SkillArea } from '../types';
import { formQuestions } from '../actions/generate-questions';

export default function SkillsTestPage() {
  const [skillAreas, setSkillAreas] = useState<SkillArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkillAreas = async () => {
      const areas = await formQuestions();
      setSkillAreas(areas);
      setLoading(false);
    };
    fetchSkillAreas();
  }, []);

  return (
    loading ? <div>Loading skills test...</div> : <SkillsTest skillAreas={skillAreas} />
  );
}
