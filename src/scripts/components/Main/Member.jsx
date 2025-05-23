import React, { useState } from 'react';
import member_info from '../../config/member.js';

// 手搓横向选择选项框
const GradeSelector = ({ options, selected, onSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="Tab">
            <button
                onClick={() => setOpen(!open)}
                className="Tab__button"
            >
                {selected} 
            </button>
            {open && (
                <div className="Tab__menu">
                    {options.map((grade) => (
                        <div
                            key={grade}
                            className={`Tab__item ${selected === grade ? 'selected' : ''}`}
                            onClick={() => {
                                onSelect(grade);
                                setOpen(false);
                            }}
                        >
                            {grade}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default () => {
    // 分组数据
    const groupedMembers = member_info.reduce((acc, member) => {
        const grade = member.grade || 'others';
        if (!acc[grade]) acc[grade] = [];
        acc[grade].push(member);
        return acc;
    }, {});

    groupedMembers['ALL'] = member_info;

    const gradeOptions = Object.keys(groupedMembers).reverse();;
    const [selectedGrade, setSelectedGrade] = useState('ALL');
    const members = groupedMembers[selectedGrade];

    return (
        <section className="_member">
            <div className="member__line-start" />
            <div className="member__content">
                <div className="member__head">
                    <h2>Member</h2>
                    <GradeSelector
                        options={gradeOptions}
                        selected={selectedGrade}
                        onSelect={setSelectedGrade}
                    />
                </div>

                <div className="member__list">
                    {members.map(member => (
                        <div className="profile" key={member.id}>
                            <a
                                className="member__avatar"
                                href={member.url}
                                title={member.id}
                                target="_blank"
                            >
                                <img title={member.id} src={member.avatar} />
                                <span>{member.id}</span>
                            </a>
                            <div className="member__intro">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: member.intro
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="member__line-end" />
        </section>
    );
};
